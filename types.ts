type SomeType = {
  /** 
   * Client ID of your GitHub/OAuth App. Find it on your app's settings page.
   *  @required
   */
  clientId: string,
  /** 
   * Client Secret for your GitHub/OAuth App. Create one on your app's settings page.
   *  @required
   */
   clientSecret: string,
   /** 
    * Either "oauth-app" or "github-app". Defaults to "oauth-app".
   */
    clientType: string
}
