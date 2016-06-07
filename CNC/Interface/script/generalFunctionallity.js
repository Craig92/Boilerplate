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
 * Ruft nach einer 6000ms die refreshPage()-Methode auf.
 */
function autoRefresh() {
    setInterval(refreshPage, 6000);
}