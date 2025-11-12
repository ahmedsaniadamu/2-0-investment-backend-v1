export const validateUploadedDocuments = (documentsRequired, documentsUploaded) => {
  const errors = [];

  for (const requiredDoc of documentsRequired) {
    const match = documentsUploaded.find(
      (doc) => doc.title === requiredDoc.name
    );

    if (!match) {
      errors.push(`Missing required document: ${requiredDoc.name}`);
      continue;
    }

    const fileExtension = match.url.split(".").pop().toLowerCase();
    const isValidType = requiredDoc.fileTypes.includes(`.${fileExtension}`);

    if (!isValidType) {
      errors.push(
        `Invalid file type for ${requiredDoc.name}. Allowed types: ${requiredDoc.fileTypes.join(", ")}`
      );
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    statusCode: errors.length === 0 ? 200 : 400,
  };
};
