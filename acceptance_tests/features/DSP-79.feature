@ErrorForm @StepThree @Validation
Feature: Validation for Step Three of the Error form

	Background:
		When I go to Step Three of the error form

	Scenario: Attempting to proceed to Step Four witout entering anything
		When I click Continue
		Then I see the "Enter your full name" link in the "/html/body/main/div[2]/div/div/ul/li[1]/a" xpath
		Then I see the "Enter your date of birth" link in the "/html/body/main/div[2]/div/div/ul/li[2]/a" xpath 
		Then I see the "Tell us your nationality" link in the "/html/body/main/div[2]/div/div/ul/li[3]/a" xpath 
		Then I see the "Enter your full name" link in the "/html/body/main/div[2]/div/form/div[1]/label/span[1]" xpath
		Then I see the "Enter your date of birth" link in the "/html/body/main/div[2]/div/form/fieldset/span" xpath 
		Then I see the "Tell us your nationality" link in the "/html/body/main/div[2]/div/form/div[2]/label/span[1]" xpath 

	Scenario: Attempting to proceed to Step Four without entering something in the name field
		When I enter a valid date of birth
		And I type fill in the nationality field with something valid
		When I click Continue
		Then I see the "Enter your full name" link
		And I see "Enter your full name"

	Scenario: Attempting to proceed to Step Four without entering anything in the date of birth fields
		When I enter something valid in the Full name field
		And I type fill in the nationality field with something valid
		When I click Continue
		Then I see the "Enter your date of birth" link
		And I see "Enter your date of birth"

	Scenario: Attempting to proceed to Step Four witout selecting a nationality
		When I enter something valid in the Full name field
		When I enter a valid date of birth
		When I click Continue
		Then I see the "Tell us your nationality" link
		And I see "Tell us your nationality"

	# Scenario: Filling the Full name field with numbers
	# 	When I enter numbers into the Full name field
	# 	When I click Continue
	# 	And I see "1. Invalid Entry"
	# 	And I see "1. Invalid Entry"

	Scenario: Selecting Continue with text values in the Date of birth fields
		When I enter text values into the Date of birth field
		And I click "Continue"
		Then I am on Step Three of the error form
		Then I see the "Date must only contain numbers" link
		And I see "Date must only contain numbers"

	Scenario: Selecting Continue with special character values in the Date of birth fields
		When I enter special character values into the Date of birth field
		And I click "Continue"
		Then I am on Step Three of the error form
		Then I see the "Date must only contain numbers" link
		And I see "Date must only contain numbers"