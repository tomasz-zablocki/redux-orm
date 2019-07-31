const links                 = {};
exports.isStatic            = isStatic;
exports.docusaurusAnchor    = docusaurusAnchor;
exports.sanitize            = sanitize;
exports.docusaurusGuessLink = docusaurusGuessLink;
exports.docusaurusParseLink = docusaurusParseLink;
exports.docusaurusLink      = docusaursLink;
exports.capitalize          = capitalize;

function docusaursLink(
    parent, prefix, accessSymbol, name, methodSign, returnTypes, scope) {

  const parentAndSymbol = scope === 'instance' ?
      [parent.toLowerCase(), '+'] :
      [parent, '.'];

  const link = [
    '#',
    ...parentAndSymbol,
    name,
  ].join('');

  return getLink(parent, name, link);
}

function docusaurusGuessLink(
    parent, prefix, accessSymbol, name, methodSign, returnTypes) {
  const link = getLink(parent, name);
  if (link) {
    return '[' + name + '](' + link + ')';
  }
  return name;
}

function docusaurusParseLink(roughName) {
  if (!roughName) return;
  if (roughName.indexOf('http') >= 0) {
    return '[' + roughName + '](' + roughName + ')';
  }
  const parts = roughName.split(/[#\.:]/),
        link  = getLink(parts[0], parts[1]);
  if (link) {
    return '[' + roughName + '](' + link + ')';
  }
  return roughName;
}

function sanitize(returnTypes) {
  if (Array.isArray(returnTypes)) {
    return returnTypes.join('|');
  } else {
    return returnTypes;
  }
}

function getLink(parent, name, link) {
  if (parent === 'event') return name;
  var sig = parent + '#' + name,
      out = links[sig]
  ;

  if (link) {
    links[sig] = link;
    out        = link;
  } else if (!out) {
    sig = 'null#' + name;
    out = links[sig];
  }

  return out;
}

function docusaurusAnchor(longname, scope) {
  return scope === 'instance' ?
         longname.substr(0, longname.indexOf('#')).toLowerCase() + '+' +
         longname.substr(longname.indexOf('#') + 1) :
         longname;
}

function isStatic() {
  return this.scope === 'static' ? 'static ' : '';
}

/**
 *
 * @param {string} str
 * @return {*}
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}






