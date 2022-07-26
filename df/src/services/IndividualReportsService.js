import authHeader from "./AuthHeader";

const API_URL = process.env.REACT_APP_BACKEND_API_URL;

class IndividualReportsService {

  async list() {
    try {
      const response = await fetch(API_URL + "individual-report", {
        method: 'GET',
        headers: authHeader()
      });
      const data = await response.json();
      console.log('Success:', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  download(report_name) {
    try {
      fetch(API_URL + "download-individual-report", {
        method: 'POST',
        headers:
          Object.assign({}, authHeader(), { 'Accept': 'application/octet-stream, binary/octet-stream' }),
        body: JSON.stringify({ report_name })
      })
        .then(res => res.blob())
        .then(blob => {
          var fileUrl = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = fileUrl;
          a.download = "individual-report.xlsx";
          document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
          a.click();
          a.remove();  //afterwards we remove the element again      
        });
    } catch (error) {
      console.error('Error:', error);
    };
  }


}

export default new IndividualReportsService();