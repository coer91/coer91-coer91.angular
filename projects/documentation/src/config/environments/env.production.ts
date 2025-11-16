/**********  PRODUCTION ***********/
declare const appSettings: any;

export const environment = {
    production: true,
    appInfo: {
        id:   appSettings.appInfo.id as number,
        name: appSettings.appInfo.name as string, 
    },
    webAPI: { 
        mySystem:   appSettings.webAPI.production.mySystem as string,
        myBusiness: appSettings.webAPI.production.myBusiness as string
    },
    login: {
        static: appSettings.login.static as boolean
    },
    navigation: {
        static: appSettings.navigation.static as boolean
    }, 
};