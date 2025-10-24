public class RefreshApexController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts() {
        try {
            List<Account> accountList = [SELECT Id, Name, Phone, Type FROM Account LIMIT 10];
            return accountList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
