import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs'; 

inquirer.prompt ({

    type:"input",
    message:"What do you want to research?",
    name:"url",
})
  .then((answers) => {
    fs.writeFile('message.txt', answers.url, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    }); 

    fs.readFile('message.txt','utf-8', (err,data) => {
        if (err) throw err;
        var qr_png = qr.image(data, { type: 'png' });
        qr_png.pipe(fs.createWriteStream('qr.png'));
        
        

    });

    

  })
  .catch((error) => {
    if (error.isTtyError) {
       console.log("Prompt couldn't be rendered in the current environment");
    } else {
      throw error;
    }
  });



 


