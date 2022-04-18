Practice custom hooks : \
    -> useHttp: using a reducer where im dispatching by action type (SEND,RESPONSE,ERROR,CLEAR). 
       created a custom function **sendRequest** (url,method,body,reqExtra - used to forward date between customHook and component,reqIdentifier - just an identifier used to determine the action) which is used to send requests to firebase and dispatch actions based on the response. Also handles errors and displays a modal with backdrop if needed.\
       
    -> useInput: this custom hook is used to manage the inputs from the **IngredientForm** component. Includes some validations and returns an object who is used to store the value,2 refferences for the change/blur events, 2 flags used to determine if the form can be submitted or no.\
    
    
Create/Delete items. Fireabse (realtime databse) used to store data.\
Filter data using query params & firebase query params.\

**useHttp is used to send requests to Firebase and all the logic is handled in the useEffect from Ingredients component based on identifiers (REMOVE_INGREDIENT,ADD_INGREDIENT)**\


 