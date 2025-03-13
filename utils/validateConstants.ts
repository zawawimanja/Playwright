import * as fs from 'fs';
import * as path from 'path';

const requiredFields = [
  'homePageHeading',
  'homePageText',
  'socsoLogoAltText',
  'preRegistrationHeading',
  'preRegistrationText',
  'searchInsuredPersonHeading',
  'searchInsuredPersonText',
  'noticeTypeText',
  'remarksText',
  'insuredPersonInfoText',
  'reasonLabel',
  'schemeRefNoLabel',
  'occupation',
  'address1',
  'address2',
  'address3',
  'state',
  'city',
  'postcode',
  'nationality',
  'accidentInjury',
  'socsoState',
  'socsoOffice',
  'employerName',
  'employerDesignation',
  'bankAccountYes',
  'bankLocation',
  'bankNameAccident',
  'bankAccountType',
  'bankBranch',
  'bankAccountNo',
];

export function validateConstants(constants: any) {
  const missingFields = requiredFields.filter((field) => !(field in constants));
  if (missingFields.length > 0) {
    throw new Error(
      `Missing required fields in constants.json: ${missingFields.join(', ')}`,
    );
  }
}
