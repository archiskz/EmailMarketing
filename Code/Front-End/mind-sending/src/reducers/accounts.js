var initialState = [{
	id:1,
	username: "son",
	password: "1234"
}];


const accounts = (state = initialState, action) => {
	switch(action.type){
		default: return [...state];
	}
};
 export default accounts;