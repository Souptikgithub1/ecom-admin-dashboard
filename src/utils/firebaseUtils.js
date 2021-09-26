import {projectStorage} from "../firebase/firebaseConfig";

export const uploadImgPromise = async (img) => {
    return await projectStorage.ref(`/images/${img.name}`).put(img.file)
        .then(snapshot => {
            return projectStorage.ref('images').child(img.name).getDownloadURL()
        }, error => {
            return Promise.reject(error)
        })

}