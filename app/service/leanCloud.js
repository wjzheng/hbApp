/**
 * Created by kim on 2017/6/6.
 */

import AV from "leancloud-storage";
const leanCloud = {
  saveObject(collection, obj) {
    let feedback = AV.Object.new(collection);
    feedback.set('text', obj.text);
    return feedback.save();
  },
  fetchObject(collection, obj) {
    let query = new AV.Query(collection);
    return query.find();
  }
};
export default leanCloud;