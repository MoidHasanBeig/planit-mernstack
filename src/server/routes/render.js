const renderHtml = (req,res,prodMode,compiler) => {
    prodMode
    ? res.sendFile(__dirname + '/dist_index.html')
    :  compiler.outputFileSystem.readFile(compiler.outputPath + '/dist_index.html', (err,result) => {
      res.set('content-type', 'text/html');
      res.send(result);
    });
};

export default renderHtml;
