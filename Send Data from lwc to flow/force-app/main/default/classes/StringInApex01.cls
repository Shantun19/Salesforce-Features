public class StringInApex01 {
    // constructor
    public StringInApex01() {
        System.debug('String class in apex');
    }

    public void StringMethodsInApex() {
        String str = 'hello from the salesforce';

        // capitalize the string 
        // capitalize() : make the first letter of the string capital
        String newString = str.capitalize();
        System.debug('the old string is ' + str); // Hello from the salesforce
        System.debug('the capitalize string is ' + newString); // Hello from the salesforce

        // contains() : check the param string is present in the actual string
        System.debug('contains() ' + str.contains('force'));

        // toUpperCase() : convert the string into the uppercase
        System.debug('the upperCase() ' + str.toUpperCase());
    }
}