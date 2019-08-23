'use strict';
import TestHelpers from './helpers';

const Incorrect_Seed_Words = 'fold media south add since false relax immense pause cloth just falcon';
const Correct_Seed_Words = 'fold media south add since false relax immense pause cloth just raven';
const Incorrect_Password_Length = 'The password needs to be at least 8 characters long';
const Invalid_Seed_Error = `Error: Seed phrase is invalid.`;

describe('Import seedphrase flow', () => {
	it('should tap on sync or import cta and import wallet via seedphrase', async () => {
		// Check that we are on the home screen
		await TestHelpers.checkIfVisible('home-screen');
		// Check that Sync or import your wallet CTA is visible & tap it
		await TestHelpers.waitAndTap('onboarding-import-button');
		// Check that we are on the import wallet screen
		await TestHelpers.checkIfVisible('import-wallet-screen');
		// Check that Import using seed phrase CTA is visible & tap it
		await TestHelpers.waitAndTap('import-wallet-import-from-seed-button');
		// Check that we are on the import from seed screen
		await TestHelpers.checkIfVisible('import-from-seed-screen');
		// Input incorrect seed phrase
		await TestHelpers.typeTextAndHideKeyboard(`input-seed-phrase`, Incorrect_Seed_Words);
		// Input short password
		await TestHelpers.typeTextAndHideKeyboard(`input-password-field`, `1234567`);
		// Input short password confirm
		await TestHelpers.typeTextAndHideKeyboard(`input-password-field-confirm`, `1234567`);
		// ensure alert box is displayed with correct text
		await expect(element(by.text(Incorrect_Password_Length))).toBeVisible();
		// dismiss alert by tapping ok
		await element(by.label('OK'))
			.atIndex(0)
			.tap();
		// Input password
		await TestHelpers.typeTextAndHideKeyboard(`input-password-field`, `12345678`);
		// Input password confirm
		await TestHelpers.typeTextAndHideKeyboard(`input-password-field-confirm`, `12345678`);
		// Ensure error is displayed
		await TestHelpers.checkIfHasText('invalid-seed-phrase', Invalid_Seed_Error);
		// Select all text in seed phrase
		await element(by.id('input-seed-phrase')).longPress();
		// select all text
		await TestHelpers.tapByText('Select All');
		// Clear seed phrase
		await element(by.id('input-seed-phrase')).clearText();
		// Input correct seed phrase
		await TestHelpers.typeTextAndHideKeyboard(`input-seed-phrase`, Correct_Seed_Words);
		// Tap outside of box
		await TestHelpers.tapAtPoint('import-from-seed-screen', { x: 40, y: 20 });
		// Tap import to continue
		await TestHelpers.waitAndTap('submit');
		// Check that we are on the metametrics optIn screen
		await TestHelpers.checkIfVisible('metaMetrics-OptIn');
		// Check that I Agree CTA is visible and tap it
		await TestHelpers.waitAndTap('agree-button');
		// Check that we are on the wallet screen
		await TestHelpers.checkIfExists('wallet-screen');
		// Check that No thanks CTA is visible and tap it
		await TestHelpers.waitAndTap('onboarding-wizard-back-button');
		// Check that the onboarding wizard is gone
		await TestHelpers.checkIfNotVisible('onboarding-wizard-step1-view');
	});

	// it('should ', async () => {
	// 	//
	// });
});
