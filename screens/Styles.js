import { StyleSheet } from "react-native";
import { Colors } from "../config";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    marginTop:10
  },
  column:{
    flexDirection:'row',
    justifyContent:'space-between'

  },
  logoContainer: {
    alignItems: 'center'
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.black,
    paddingTop: 20
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: 'center'
  },
  footerText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '700'
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  trees_item:{
    flex:1,
    justifyContent:'center',
    height:80,
    backgroundColor: Colors.primaryTransparenci,
    margin:2,
    marginBottom:8,
    padding:10,
    paddingLeft:20,
    borderRadius:15,
  },
  text_trees:{
    color:'white',
    fontSize:15
  },
  
  title_item_tree:{
    color:'white',
    fontSize:17,
    fontWeight:'bold'
  },
  tree_specie:{
    color:'white',
    fontSize:17,
    fontStyle:'italic'
  },
  tree_name:{
    flexDirection:'row',
  },
  tree_date:{
    flexDirection:'row',
    justifyContent: 'space-between',
    marginTop:5
  },
  tree_date_add:{
    color:'white',
    fontSize:14,
    alignSelf:'flex-end',
  },
  search_bar:{ 
    backgroundColor: Colors.primaryTransparenci, 
    marginBottom:10,
    height:40,
    width: "100%" ,
    
  },
  button_toggle_group:{
    height:30,
    marginBottom:10,
  },
  image_tree:{ 
    width: "100%", 
    height: 200 ,
    alignSelf:'center',
  },
  view_tree_title:{
    fontStyle: 'italic,',
    fontSize:14,
    textAlign: 'center',
    marginTop:5
  },
  view_tree_subtitle:{
    fontStyle:'italic',
    textAlign:'center',
    fontSize:14
  },
  identification_section:{
    fontSize:20,
    fontWeight:'700',
    marginTop:15,
    alignSelf:"flex-start"
  },
  identification_text:{
    fontSize:16,
    marginTop:5,
  },
  bold:{
    fontWeight:'bold',
    fontSize:15
  },
  section_values:{
    marginTop:10
  }

});

export default styles;