import firebase from 'firebase'
import '@firebase/firestore'
const firebaseconfig={
    apiKey: "AIzaSyCkjMo5_DP5LOPNYJzM0zPNzXx8H4VLSRo",
    authDomain: "shared-a7555.firebaseapp.com",
    databaseURL: "https://shared-a7555.firebaseio.com",
    projectId: "shared-a7555",
    storageBucket: "shared-a7555.appspot.com",
    messagingSenderId: "887377171929",
    appId: "1:887377171929:web:f12182d38f9310fc0135c8",
    measurementId: "G-Z4Y12GSTL4"
 
};


class Fire{
    constructor(callback){
        this.init(callback)
    }
    init(callback){
        if (!firebase.apps.length){
            firebase.initializeApp(firebaseconfig)
        }
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                callback(null,user)
            }else{
                firebase.auth().signInAnonymously().catch(error=>{
                    callback(error)
                })
            }
        })
    }
getLists(callback) {
    let ref = firebase.firestore().collection('Unauthorized').doc();
    this.unsubscribe = ref.onSnapshot(snapshot =>{
        lists=[]
        snapshot.forEach(doc=>{
            lists.push({id:doc.id,...doc.data()})
        })
        callback(lists)
    })
}
}

export default Fire
