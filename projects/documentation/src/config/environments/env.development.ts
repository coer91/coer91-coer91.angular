/**********  DEVELOPMENT ***********/
declare const appSettings: any; 

export const environment = {
    production: false,
    appInfo: {
        id: appSettings.appInfo.id as number,
        name: appSettings.appInfo.name as string, 
    },
    webAPI: { 
        mySystem:   appSettings.webAPI.development.mySystem as string,
        myBusiness: appSettings.webAPI.development.myBusiness as string
    },
    login: {
        static: appSettings.login.static as boolean
    },
    navigation: {
        static: appSettings.navigation.static as boolean
    }, 
}; 