const streamToBuffer = async (stream) => {
     try {

          return new Promise((resolve, reject) => {
               const chunks = [];

               stream.on("data", (chunk) => chunks.push(chunk));
               stream.on("end", () => resolve(Buffer.concat(chunks)));
               stream.on("error", reject);
          });

     } catch (error) {
          console.log(error);
     };
};

module.exports = streamToBuffer;