function customResponceHandler(res, data = { statusCode: 400 }) {
  switch (data.statusCode) {
    case 200:
      res.status(data.statusCode).send(data);
      // return Promise.reject(data);
      break;
    case 201:
      res.status(data.statusCode).send(data);
      // return Promise.reject(data);
      break;
    case 204://when only send success message 
      res.status(data.statusCode).send(data.message);
      // return Promise.reject(data);
      break;
    // case 400:
    //   res.status(data.statusCode).send({ message: data.result });
    //   break;
    // case 401:
    //     return Promise.reject(data);
    //     break;
    case 404:
      res.status(data.statusCode).send({ message: data.result });
      // return Promise.reject(data);
      break;
    case 422:
      res.status(data.statusCode).send({ message: data.result.error.details[0].message });
      // Promise.reject(data);
      break;

    case 409:
      res.status(data.statusCode).send({ message: data.result });
      // Promise.reject(data);
      break;
    case 406:
      res.status(data.statusCode).send({ message: data.result });
      // Promise.reject(data);
      break;
    case 403:
      res.status(data.statusCode).send({ message: data.result });

      // return Promise.reject(data);
      break;
    // case 500:
    //     return Promise.reject(data);
    //     break;

    default:
      res.status(400).send({ message: "Something Went Wrong",err:data.err });

  }
}


// module.exports= { customError }
module.exports = customResponceHandler
