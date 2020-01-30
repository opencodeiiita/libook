var pageNum = 1,
    pageNumPending = null;

function renderPage(num) {
    pageRendering = true;

    pdf.getPage(num).then(function (page) {
        var scale = 1;
        var viewport = page.getViewport({
            scale: scale,
        });

        var canvas = document.getElementById("pdf");
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        var renderTask = page.render(renderContext);

        renderTask.promise.then(function () {
            pageRendering = false;
            if (pageNumPending !== null) {
                renderPage(pageNumPending);
                pageNumPending = null;
            }
        });
    });
    document.getElementById('page_num').value = num;
}

function queueRenderPage(num) {
    if (pageRendering) {
        pageNumPending = num;
    } else {
        renderPage(num);
    }
}

function onPrevPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);


function onNextPage() {
    if (pageNum >= pdf.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}
document.getElementById('next').addEventListener('click', onNextPage);

function onChangePage() {
    var newPageNum = Number(document.getElementById('page_num').value);
    if (newPageNum > pdf.numPages || newPageNum < 1) {
        document.getElementById('page_num').value = pageNum;
        return;
    }
    pageNum = newPageNum;
    queueRenderPage(pageNum);
}
document.getElementById('page_num').addEventListener('change', onChangePage);

pdfjsLib.getDocument("../resources/test.pdf").promise.then(function (pdf_) {
    pdf = pdf_;
    document.getElementById('page_count').textContent = pdf.numPages;

    renderPage(pageNum);
});