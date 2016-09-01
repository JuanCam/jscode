function matrixfyString(str, rows) {
    for (var r = 0; r < str.length; r += rows) {
        console.log(str.slice(r, r + rows))
    }
}
