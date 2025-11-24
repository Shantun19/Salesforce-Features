how to get the dependent picklist values in apex

// ---------------------------------------------
// RUN THIS IN ANONYMOUS WINDOW
// ---------------------------------------------

// Object and fields
Schema.sObjectType objType = Schema.getGlobalDescribe().get('ABC_Department__c');
Schema.DescribeSObjectResult objDescribe = objType.getDescribe();

// Tokens for controlling + dependent fields
Schema.sObjectField controllingField = objDescribe.fields.getMap().get('TechStack__c');
Schema.sObjectField dependentField   = objDescribe.fields.getMap().get('Languages__c');

// Call the method to get the mapping
Map<Object, List<String>> dependentValuesMap = getDependentPicklistValues(dependentField);

// Log output
System.debug('***** DEPENDENT PICKLIST MAP *****');
System.debug(dependentValuesMap);


// ---------------------------------------------
// Method copied into Anonymous Window
// ---------------------------------------------
public static Map<Object, List<String>> getDependentPicklistValues(Schema.sObjectField dependToken)
{
    Schema.DescribeFieldResult depend = dependToken.getDescribe();
    Schema.sObjectField controlToken = depend.getController();
    if (controlToken == null) return null;

    Schema.DescribeFieldResult control = controlToken.getDescribe();

    List<Schema.PicklistEntry> controlEntries =
        (control.getType() == Schema.DisplayType.Boolean
            ? null
            : control.getPicklistValues()
        );

    // Base64 decode map
    String base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    Map<Object, List<String>> dependentPicklistValues = new Map<Object, List<String>>();

    for (Schema.PicklistEntry entry : depend.getPicklistValues())
    {
        if (!entry.isActive()) continue;

        // Extract the validFor base64 bitmask
        List<String> base64chars =
            String.valueOf(
                ((Map<String, Object>)JSON.deserializeUntyped(JSON.serialize(entry))).get('validFor')
            ).split('');

        for (Integer index = 0; index < (controlEntries != null ? controlEntries.size() : 2); index++)
        {
            Object controlValue =
                (controlEntries == null
                    ? (Object)(index == 1)
                    : (Object)(controlEntries[index].isActive() ? controlEntries[index].getLabel() : null)
                );

            if (controlValue == null) continue;

            Integer bitIndex = index / 6;
            Integer bitShift = 5 - Math.mod(index, 6);

            // Check bitmask match
            if ((base64map.indexOf(base64chars[bitIndex]) & (1 << bitShift)) == 0)
                continue;

            if (!dependentPicklistValues.containsKey(controlValue))
            {
                dependentPicklistValues.put(controlValue, new List<String>());
            }

            dependentPicklistValues.get(controlValue).add(entry.getLabel());
        }
    }

    return dependentPicklistValues;
}
