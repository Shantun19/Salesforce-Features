public with sharing class ApexFundamentals {
    public void ApexFundamentals() {
        System.debug('Inside the Constructor');
    }

    // primitve data type  in apex.
    // primitive data types are the data types that is already available in apex.
    // [Boolean , String , Integer , Long , Decimal , Double , Date , Time , Datetime , Blob , ID] these are the example of primitive data type.
    // if a variable contains null value means it doesn't acquire any memory space.
    // Integer - 32bits and Long - 64bits
    // Double is also - 64bits
    // if you don't assign any value to variable the default value will be null example : Integer num; so current the num = null;

    public static void primitiveDataType() {
        Boolean isActive = true;
        System.debug(isActive);

        String greet = 'Good Morning';
        System.debug(greet);

        Integer rollNumber = 11009988;
        System.debug(rollNumber);

        Long worldPopulation = 7000000000L;
        System.debug(worldPopulation);

        Decimal cgpa = 8.7;
        System.debug(cgpa);

        Double lightSpeed = 93000000/186000;
        Double e = 2.7182818284D;
        System.debug(lightSpeed);

        Date todaysDate = Date.newInstance(2025 , 7 ,14);
        System.debug(todaysDate);

        // Time.newInstance(hour , min , sec , milisecond)
        Time currentTime = Time.newInstance(3, 25, 0, 0);
        System.debug(currentTime);

        // Blob Data type in apex(Binary large Object)
        // this is use to store the binary data like (files , images) inside the salesforce.
        // you can convert the Blob into String and vice versa.
        // there us built in methods to work with blob.
        String blobString = 'Hello , salesforce blob';
        Blob blobData = Blob.valueOf(blobString); // string is converted to blob 
        String convertedString = blobData.toString(); // blob data is converted to String.
        System.debug('the converted data is : ' + convertedString);

        // Decimal datatype are the datatype that stores the value after the decimal point means store the fractional number.
        // salesforce automatically assign Decimal type currency fields.
        // Scale : determines the number of points after decimal points.
        // when you create a decimal value, its scale depends on the source of values
        // 1.if created from query : scale is the scale of query fields
        // 2.if created from String : scale = number of digits
        // 3.if created from a non-decimal number(like Integer or Double) : first convert them into string and then set the scale.
        // you can also set the scale explicitly using the .setScale() method
        // two decimals with same numeric value but different scales (1.1 and 1.10) are not considered exactly the same.
        Decimal decFromString = Decimal.valueOf('123.45');
        System.debug('Decimal from String: ' + decFromString);  // Outputs: 123.45
        System.debug('Scale: ' + decFromString.scale());        // Outputs: 2 count of digits after 123.

        // Decimal created from an Integer (no decimal places)
        Decimal decFromInt = Decimal.valueOf(100);
        System.debug('Decimal from Integer: ' + decFromInt);    // Outputs: 100
        System.debug('Scale: ' + decFromInt.scale());  // 0

        // Set scale explicitly (e.g., 3 decimal places)
        Decimal decSetScale = decFromInt.setScale(3);
        System.debug('Decimal after setScale(3): ' + decSetScale); // Outputs: 100.000
        System.debug('Scale: ' + decSetScale.scale());             // Outputs: 3

        Decimal d1 = Decimal.valueOf('1.1');
        Decimal d2 = Decimal.valueOf('1.10');
        System.debug('d1 equals d2? ' + d1.equals(d2));  // True, numerically equal
        System.debug('d1 hashcode == d2 hashcode? ' + (d1.hashCode() == d2.hashCode())); // Usually false

        //ID data type : any valid 18 character lightning platform record identifier.
        ID id='00300000003T2PGAA0';

        // Object Data type in apex : any data type in apex primitive , user-defined custom classes , the SObject generic / specific.
        // all these data types inherit the from the Object class.
        Object obj = 10;
        // casting 
        Integer i = (Integer)obj;
        System.debug('the casting is done' + 1);

        // for user defined and custom typed 
        /* 
            Object obj = new MyUserdefineCustomApexClass();
            MyUserdefineCustomApexClass mc = (MyUserdefineCustomApexClass)obj;// perform casting
        */

        // String data type in apex
        // String is the character of sequence 
        // the size of character of String is depend upon the heap size 
        // String fields of an SObject like Account , Contact cannot be empty means you have to set null to it.
        // can't have leading or trailing zeroes means (space at the start or at the end) removed by apex.
        // apex string can be null , can be empty , contains leading or trailing zeroes.
        String s1 = null; // fine in apex
        String s2 = ''; // fine in apex 
        String s3 = '  Hello  '; // fine in apex

        // but if you try this 
        // example : Contact.Name = ''; // this will throw an error.
    }

    // Note :
    public void solutionNoteExample() {
        /*
            if you are working with the solution object there is a field called solutuionNote which behaves like a string with html support.
            trigger t on Solution (before insert) {
                Trigger.new[0].SolutionNote = '<h1>hello</h1>';
            }
            Displays “hello” in a big heading (because <h1> is valid HTML).
            if you try to use the unspported html tags it will remove the html tags.
            trigger t2 on Solution (before insert) {
                Trigger.new[0].SolutionNote = '<javascript>Hello</javascript>Goodbye';
            }
            <javascript> is removed only goodBye is saved.
        */
    }

    // Escape Sequences 
    public void escapeSequenceInApex() {
        // 1. new line character \n
        String message = 'Hello\nWorld';
        /*output :
            Hello
            World
        */

        // 2. tab space \t
        String message1 = 'Hello\tWorld';
        /*output :Hello World*/

        // 3. \" double quote
        String message2 = 'She said, \"Hello\"';
        // output : She said, "Hello!"

        // 4. \' single quote
        String message3 = 'it\'s a great day';
        // output : It's a great day!
    }

}