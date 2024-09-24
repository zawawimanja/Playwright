import { test, expect } from '@playwright/test';
import { login } from '../../utils/base'; // Import from base.ts
import { PreregistrationPage } from '../../pages/prereg';
import { LeftTabPage } from '../../pages/left_tab';
import { DraftPage } from '../../pages/draft';
import { RemarksPage } from '../../pages/remarks';
import { PreviewSubmissionPage } from '../../pages/preview_submission';
import { OccupationalDiseasePage } from '../../pages/od_info';
import { EmployerInfoPage } from '../../pages/employer_info';
import { MedicalCertificatePage } from '../../pages/mc_info';
import { WagesInfoPage } from '../../pages/wages_info';
import { InsuredPersonInfoPage } from '../../pages/insured_person_info';
import { PreferredSOCSOOfficePage } from '../../pages/socso_office';
import { CertificationByEmployerPage } from '../../pages/cert_employer';
import { BankInformationPage } from '../../pages/bank_info';
import { SupportingDocumentPage } from '../../pages/support_doc';
import { ConfirmationOfInsuredPage } from '../../pages/confirm_person';
import { CalendarPage } from '../../utils/calendar';


test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

test('Prereg PK OD', async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);



  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();
  expect(leftTabPage.pageBuilderRoot).toContainText(
    'HomePre-RegistrationHUK Pre-RegistrationCreate RevisionMy CasesAppointmentsInsured Person SearchToolsSSNCommon ListingPermanent RepresentativeAnnual DeclarationReemployment Scheduler'
  );
  await expect(leftTabPage.preregistrationLink).toBeVisible();
  leftTabPage.clickPreregistration();


  await preregPage.selectNoticeTypePreRegOption('OD');
await preregPage.selectInsuredPersonEmployment('Yes')
await preregPage.selectIdentificationType('2');
await preregPage.fillIdentificationNo('961130086256');
  await preregPage.selectNoticeAndBenefitClaimFormOption('Insured Person');
await preregPage.fillEmployerCode('B3200086169Z');
  await preregPage.clickClaimFormSubmissionByListButton();
  await preregPage.clickSearchButton();
  const page1Promise = page.waitForEvent('popup');
  await preregPage.clickNextButton();
  const page1 = await page1Promise;

  const draftPage = new DraftPage(page1);
  if (await draftPage.closeButton.count() > 0) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }
 
  const remarksPage = new RemarksPage(page1);
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText('Remarks');
  await remarksPage.remarksButton.waitFor();
  await remarksPage.addRemarksButton.click();
  await remarksPage.textbox.fill('test');
  await remarksPage.saveRemarksButton.click();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  const calendarPage = new CalendarPage(page1);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click()


   await calendarPage.selectDateInsuredPersonPage('2020', '4');
  await calendarPage.selectDayInsuredPersonPage('8');




  await insuredPersonInfoPage.fillOccupation('CS');
  await insuredPersonInfoPage.selectOccupation('1000002');
    await insuredPersonInfoPage.selectSubOccupation('1001132');
      await insuredPersonInfoPage.selectSubOccupationalList('1002058');



  await insuredPersonInfoPage.fillAddress(2, 'Lorong 10');
  await insuredPersonInfoPage.fillAddress(3, 'Jalan 1');
  await insuredPersonInfoPage.selectState('200714');
  await insuredPersonInfoPage.selectCity('201460');
  await insuredPersonInfoPage.fillPostcode('51000');
  await insuredPersonInfoPage.selectNationality('201749');




  const employerInfoPage = new EmployerInfoPage(page1);
  await employerInfoPage.clickEmployerInfoButton();

  const occupationalDiseasePage = new OccupationalDiseasePage(page1);
  await occupationalDiseasePage.clickOccupationalDiseaseButton();
  await occupationalDiseasePage.fillDescriptionOfOccupational('test');

  await occupationalDiseasePage.selectDiseaseRelatedEMploymentOption("Yes");


  await occupationalDiseasePage.fillSpecifyDutiesAndHow('test');
  await occupationalDiseasePage.fillPleaseExplainSymptoms('test');



  const medicalCertificatePage = new MedicalCertificatePage(page1);
  await medicalCertificatePage.clickMedicalCertificateButton();

  const wagesInfoPage = new WagesInfoPage(page1);
  await wagesInfoPage.clickWagesInfoButton();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

  const certificationByEmployerPage = new CertificationByEmployerPage(page1);
  await certificationByEmployerPage.clickCertificationByEmployerButton();
  await certificationByEmployerPage.fillName('MAT');
  await certificationByEmployerPage.fillDesignation('CEO');

  const bankInformationPage = new BankInformationPage(page1);
  await bankInformationPage.clickBankInformationButton();

  await bankInformationPage.accountNoSelect.waitFor();
  await expect(bankInformationPage.accountNoSelect).toBeVisible();
  await bankInformationPage.selectAccountNo('Yes');
  await bankInformationPage.selectBankLocation('204101');
  await bankInformationPage.selectBankName('802121');
  await bankInformationPage.selectBankAccountType('204401');
  await bankInformationPage.fillBankBranch('KL');
  await bankInformationPage.fillBankAccountNo('12345678');


  const confirmationOfInsuredPage = new ConfirmationOfInsuredPage(page1);



  await confirmationOfInsuredPage.clickConfirmationOfInsuredButton();
  await confirmationOfInsuredPage.checkCompletedCheckbox();

  const supportingDocumentPage = new SupportingDocumentPage(page1);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page1);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();


  await previewSubmissionPage.clickSubmitButton();
  await previewSubmissionPage.clickYesButton();
  await previewSubmissionPage.navigateToEFormRenderPage();



});