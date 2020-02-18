Feature: Get a date

Scenario: I can get the current date
  Given I am within the GMT timezone
  When I ask for the current date
  Then I should get the current date

Scenario: I can get a specific date
  Given I am within the GMT timezone
  When I ask for the date 2020-02-18T12:40:29.139Z
  Then I should get the expected date
