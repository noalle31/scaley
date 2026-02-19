const STAFF_LAYOUT = {
    fallbackWidth: 900,

    render: { 
        minWidth: 1000, 
        widthRatio: 0.99, 
        minHeight: 360, 
        heightRatio: 0.33 
    },

    stave: { 
        xRatio: 0.0015, 
        yRatio: 0.20 
    },
};

function getStaffLayoutFromWidth(containerWidth) {
    const { minWidth, widthRatio, minHeight, heightRatio } = STAFF_LAYOUT.render;
    const { xRatio, yRatio } = STAFF_LAYOUT.stave;

    const width = Math.max(
        minWidth,
        Math.floor(containerWidth * widthRatio)
    );
    const height = Math.max(
        minHeight, 
        Math.floor(width * heightRatio)
    );

    const x = Math.floor(width * xRatio);
    const y = Math.floor(height * yRatio);
    const staveWidth = width - x * 2;

    return { width, height, x, y, staveWidth };
}
function getStaffLayout(staffEl) {
    // use the element’s width if available,
    // otherwise fall back to the browser window width,
    // otherwise fall back to 900 (a last-resort default).
    const containerWidth = 
    staffEl.clientWidth || window.innerWidth || STAFF_LAYOUT.fallbackWidth;

    return getStaffLayoutFromWidth(containerWidth)
}

module.exports = {
    getStaffLayout
};