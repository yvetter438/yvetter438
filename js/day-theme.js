/**
 * Alternates portfolio skin by calendar day (local): even days → markup variant,
 * odd days → default. Only applies to pages that exist in both themes.
 */
(function () {
  if (!/^https?:$/i.test(window.location.protocol)) return;

  var EXPOSED_DIR = 'yvetter438-exposed';
  var THEMED_PATHS = {
    '': true,
    index.html: true,
    'work.html': true,
    'experience.html': true,
    'random/linkflow.html': true,
  };

  function usesExposedThemeToday() {
    return new Date().getDate() % 2 === 0;
  }

  function normalizePathname(pathname) {
    var path = pathname || '/';
    if (path.length > 1 && path.charAt(path.length - 1) === '/') {
      path = path.slice(0, -1);
    }
    return path;
  }

  function parseThemedLocation() {
    var pathname = normalizePathname(window.location.pathname);
    var exposedPrefix = '/' + EXPOSED_DIR;
    var exposed = false;
    var relative = '';

    if (pathname === exposedPrefix || pathname.indexOf(exposedPrefix + '/') === 0) {
      exposed = true;
      relative = pathname === exposedPrefix
        ? ''
        : pathname.slice(exposedPrefix.length + 1);
    } else if (pathname === '/' || pathname === '') {
      relative = '';
    } else {
      relative = pathname.charAt(0) === '/' ? pathname.slice(1) : pathname;
    }

    return { exposed: exposed, relative: relative };
  }

  function buildTargetUrl(wantExposed, relative) {
    var file = relative || 'index.html';
    var suffix = file === 'index.html' ? 'index.html' : file;
    var search = window.location.search || '';
    var hash = window.location.hash || '';

    if (wantExposed) {
      return '/' + EXPOSED_DIR + '/' + suffix + search + hash;
    }
    if (file === 'index.html') {
      return '/' + search + hash;
    }
    return '/' + file + search + hash;
  }

  var loc = parseThemedLocation();
  if (!THEMED_PATHS[loc.relative]) return;

  var wantExposed = usesExposedThemeToday();
  if (wantExposed === loc.exposed) return;

  window.location.replace(buildTargetUrl(wantExposed, loc.relative));
})();
