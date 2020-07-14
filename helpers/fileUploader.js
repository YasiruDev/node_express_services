var fs = require('fs');


exports.fileUpload = (req, res,rootUrl,targetDirectory, next) => {

	var logDir = rootUrl+'/'+targetDirectory;	

	if(!fs.existsSync(logDir)){

	    fs.mkdirSync(logDir);
	}

	if (!req.files){

		next('error');   
	}else{

		var sampleFile = req.files.file;
		var tmpname = sampleFile.name.split('.'); 
		var newFile = tmpname[0]+'-'+Date.now()+'.'+tmpname[1];

		sampleFile.mv(logDir+'/'+newFile, function(err) {
			if(err){

				next(err);
			}else{
			  	var filePath = {filePath: newFile};
		  	
			  	next('',filePath);
			}
		});
	}
}