import * as firebase from 'firebase'
import FirebaseKeys from './config'

class Fire{
    constructor(){
        firebase.initializeApp(FirebaseKeys)
    }
 

    addPost = async({PickerValue,name,author,publication,edition,mrp,lendamount,localUri}) =>{
        //console.log(name)
        
        //console.log(localUri)
        //const remoteUri = await this.uploadData(localUri)
        

        return new Promise((res,rej)=>{
                this.firestore
                .collection(`Authorized`)
                .add({
                //PickerValue,
                name
                //author,
                //publication,
                //edition,
                //mrp,
                //lendamount,
                //uid:this.uid,
                //timestamp:this.timestamp,
                //image:remoteUri
                
            })
            
            
            .then(ref=>{
                res(ref)
            })
            .catch(error=>{
                throw error
                rej(error)
            })
            
        })
    }
  

    get firestore(){
        return firebase.firestore()
    }

}

Fire.shared = new Fire()
export default Fire