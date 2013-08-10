// ------------------------------------------------------------------------------------------
// Name: AppConfig
// Description: HTML 5 local storage to store app config
// ------------------------------------------------------------------------------------------      

function AppConfig() {
    

    // Public variables
    this.IsAutoStop = 0;         // public var can use true(1) or false(0), but not when storing to local storage
    this.IsAutoRefresh = 0;
    this.IsDebug = 0;
    this.MaxImagesAllowed = 0;
    this.ImageUrl = '';
    this.ControlUrl = '';
    this.PollingInterval = 60;
    this.UserName = '';
    this.Salt = '';
    this.EncryptionKey = '';
    


    // Load settings from HTML5 local storage
    this.LoadSettings = function () {
        
        this.IsAutoStop = localStorage.getItem('is_auto_stop') == "1" ? true : false;
        this.IsAutoRefresh = localStorage.getItem('is_auto_refresh') == "1" ? true : false;
        this.IsDebug = localStorage.getItem('is_debug') == "1" ? true : false;
        this.MaxImagesAllowed = localStorage.getItem('max_images_allowed');
        this.ImageUrl = localStorage.getItem('image_url');
        this.ControlUrl = localStorage.getItem('control_url');
        this.PollingInterval = localStorage.getItem('polling_interval');
        this.UserName = localStorage.getItem('username');
        this.Salt = get_display_salt();
        this.EncryptionKey = localStorage.getItem('encryption_key');
        
    }

    // Save settings to HTML5 local storage
    this.SaveSettings = function () {

        // Note: localStorage cannot take boolean, so fooked up !!!
        // http://stackoverflow.com/questions/3263161/cannot-set-boolean-values-in-localstorage

        localStorage.setItem('is_auto_stop', (this.IsAutoStop) ? '1' : '0');
        localStorage.setItem('is_auto_refresh', (this.IsAutoRefresh) ? '1' : '0');
        localStorage.setItem('is_debug', (this.IsDebug) ? '1' : '0');
        localStorage.setItem('max_images_allowed', this.MaxImagesAllowed);
        localStorage.setItem('image_url', this.ImageUrl);
        localStorage.setItem('control_url', this.ControlUrl);
        localStorage.setItem('polling_interval', this.PollingInterval);
        localStorage.setItem('username', this.UserName);
        localStorage.setItem('salt', this.Salt);
        localStorage.setItem('encryption_key', this.EncryptionKey);
        

    } // method

} // class
