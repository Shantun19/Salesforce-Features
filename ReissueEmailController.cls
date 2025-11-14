public class ReissueEmailController {

    @AuraEnabled
    public static void sendReissueEmail(Id accountId, List<String> toEmails) {
        if (accountId == null || toEmails.isEmpty()) {
            throw new AuraHandledException('Missing required data.');
        }

        // 1. Query ContentDocument files attached to Account
        List<ContentDocumentLink> links = [
            SELECT ContentDocumentId,
                   ContentDocument.Title,
                   ContentDocument.FileExtension,
                   ContentDocument.LatestPublishedVersion.VersionData,
                   ContentDocument.LatestPublishedVersion.ContentSize
            FROM ContentDocumentLink
            WHERE LinkedEntityId = :accountId
        ];

        // 2. Convert to email attachments
        List<Messaging.EmailFileAttachment> fileAttachments = new List<Messaging.EmailFileAttachment>();

        for (ContentDocumentLink cdl : links) {
            Messaging.EmailFileAttachment efa = new Messaging.EmailFileAttachment();
            efa.setFileName(cdl.ContentDocument.Title + '.' + cdl.ContentDocument.FileExtension);
            efa.setBody(cdl.ContentDocument.LatestPublishedVersion.VersionData);
            efa.setContentType('application/octet-stream');
            fileAttachments.add(efa);
        }

        // 3. Prepare email
        Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
        mail.setToAddresses(toEmails);
        mail.setSubject('Reissued Filing – Documents Included');
        mail.setPlainTextBody('Hello,\n\nPlease find attached the documents related to this account.\n\nThank you.');
        mail.setFileAttachments(fileAttachments);

        // 4. Send
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
    }
}
