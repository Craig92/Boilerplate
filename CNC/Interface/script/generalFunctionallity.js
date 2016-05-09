/**
 * Aktualisiert die aktuelle Seite.
 */
function refreshPage() {

    var page = window.location.hash;

    if (page === "#tasks") {
        initializeTask();
    } else if (page === "#status") {
        initializeStatus();
    }

};

/**
 * Ruft nach einer festgelegten Zeit die refreshPage()-Methode auf.
 */
function autoRefresh() {
    setInterval(refreshPage, 6000);
}