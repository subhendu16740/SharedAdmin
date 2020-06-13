import firebase from 'firebase'
import '@firebase/firestore'
const firebaseconfig={
    FIREBASEKEYS 
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
