# Salesforce Org Migration Plan

## 1. Metadata Migration Strategy

### Prerequisites
- Source Org: freedomIncProdSource
- Target Org: [To be configured]
- Salesforce CLI is installed and authenticated to both orgs

### Metadata Components Retrieved
- Custom Objects and Fields
- Apex Classes and Triggers
- Visualforce Pages and Components
- Lightning Components
- Workflows and Flows
- Email Templates
- Page Layouts
- Permission Sets and Profiles
- Custom Metadata
- Custom Labels
- Static Resources
- Custom Applications
- Installed Packages

### Managed Packages
The following managed packages are installed in the source org and will need to be installed in the target org before deploying metadata:
- cmm
- sf_com_apps 
- Textkernel1
- sf_chttr_apps
- cmadd
- OIQ

### Migration Steps

1. **Prepare Target Org**:
   ```bash
   # Authenticate to target org
   sf org login web -a targetOrg -r https://login.salesforce.com
   ```

2. **Install Required Managed Packages** in the target org:
   - Install the same version of each managed package as in the source org
   - Installation order matters - dependencies should be installed first
   - Verify package installation with:
   ```bash
   sf package installed list -o targetOrg
   ```

3. **Deploy Metadata in Order**:
   
   a. Deploy Custom Labels, Custom Metadata, and Settings:
   ```bash
   sf project deploy start -o targetOrg -d force-app/main/default/labels force-app/main/default/customMetadata -w 30
   ```
   
   b. Deploy Custom Objects and Fields:
   ```bash
   sf project deploy start -o targetOrg -d force-app/main/default/objects -w 30
   ```
   
   c. Deploy Profiles, Permission Sets, and Roles:
   ```bash
   sf project deploy start -o targetOrg -d force-app/main/default/profiles force-app/main/default/permissionsets force-app/main/default/roles -w 30
   ```
   
   d. Deploy Apex Classes, Triggers, and Components:
   ```bash
   sf project deploy start -o targetOrg -d force-app/main/default/classes force-app/main/default/triggers -w 30
   ```
   
   e. Deploy Visualforce and Lightning Components:
   ```bash
   sf project deploy start -o targetOrg -d force-app/main/default/pages force-app/main/default/aura force-app/main/default/lwc -w 30
   ```
   
   f. Deploy Flows and Process Builders:
   ```bash
   sf project deploy start -o targetOrg -d force-app/main/default/flows -w 30
   ```
   
   g. Deploy Layouts and Flexipages:
   ```bash
   sf project deploy start -o targetOrg -d force-app/main/default/layouts force-app/main/default/flexipages -w 30
   ```
   
   h. Deploy remaining components:
   ```bash
   sf project deploy start -o targetOrg -d force-app/main/default -w 30
   ```

4. **Handle Deployment Errors**:
   - Address dependency issues by deploying components in the correct order
   - For profile permission errors, modify profiles to remove references to unavailable components
   - For managed package field errors, ensure the same version of the package is installed

## 2. Data Migration Strategy

### Key Objects and Relationships
Based on the retrieved metadata, the key objects with relationships are:

1. Primary Business Objects:
   - Account
   - Contact
   - Opportunity
   - Project_Code__c

2. Managed Package Objects:
   - bpats__Job__c
   - bpats__Placement__c
   - bpats__ATS_Applicant__c

### Data Migration Steps

1. **Export Data in Dependency Order**:
   ```bash
   # Export Accounts
   sf data query -q "SELECT Id, Name, ... FROM Account" -o targetOrg -r csv > data/accounts.csv
   
   # Export Contacts
   sf data query -q "SELECT Id, AccountId, FirstName, LastName, ... FROM Contact" -o targetOrg -r csv > data/contacts.csv
   
   # Export additional objects following parent-child relationships
   ```

2. **Prepare Data for Import**:
   - Create External ID fields if not existing
   - Map record IDs from source to target org
   - Create data load script to maintain relationships

3. **Import Data in Dependency Order**:
   ```bash
   # Import Accounts
   sf data import tree -f data/accounts.json -o targetOrg
   
   # Import Contacts
   sf data import tree -f data/contacts.json -o targetOrg
   
   # Import additional objects following parent-child relationships
   ```

4. **Validate Data Integrity**:
   - Run validation scripts to ensure all relationships are preserved
   - Check record counts between source and target orgs
   - Verify critical business processes function correctly

## 3. Post-Migration Validation

1. **Run Apex Tests**:
   ```bash
   sf apex test run -o targetOrg --wait 30 --result-format human
   ```

2. **Manual Testing Checklist**:
   - Verify critical business processes
   - Check page layouts and record visibility
   - Ensure flows and automation are working
   - Test reports and dashboards

## 4. Rollback Plan

1. **Metadata Rollback**:
   - Keep backup of target org metadata before migration
   - Use version control system to track changes
   
2. **Data Rollback**:
   - Maintain backup of all data from target org
   - Prepare scripts to restore data if needed

## 5. Timeline and Resources

1. **Pre-Migration** (1-2 days):
   - Set up environments
   - Install managed packages
   - Run test migrations

2. **Migration Execution** (1-2 days):
   - Metadata deployment
   - Data migration
   - Initial validation

3. **Post-Migration** (1-2 days):
   - Comprehensive testing
   - Issue resolution
   - User acceptance testing

## 6. Dependencies and Risks

1. **Dependencies**:
   - Managed package versions must match or be compatible
   - Organization-specific settings may need manual configuration
   - User license types must be compatible

2. **Risks and Mitigations**:
   - API limits: Plan for batch processing of large data volumes
   - Complex relationship mapping: Utilize External IDs
   - Validation rules: Temporarily disable during data load if necessary

---

*This migration plan should be reviewed and customized based on specific requirements and complexity of the Salesforce organization.* 

brs_onlineIntakeProcessFlow
