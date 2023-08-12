/*
 * This is a service class used across all the components
 * 
 * this provides the url for server side applications to all the 
 * http calls in the service classes
 *
 * 
 */
export class UriService {



  /** ShoppersWebServiceUri  properties */
  shoppersWebServiceUri = {
    protocol: 'http',
    host: "localhost",
    port: '1111',
    applicationName: ''
  };




  /**
   * This function builds the uri required for accessing the various MicroServices
   */


  buildShoppersWebServiceUri() {
    return this.shoppersWebServiceUri.protocol +
      "://" + this.shoppersWebServiceUri.host +
      ":" + this.shoppersWebServiceUri.port +
      "/" + this.shoppersWebServiceUri.applicationName;
  }






}