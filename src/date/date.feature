Feature: Get a date

@jira-123
Scenario: I can get the current date
  Given I am within the GMT timezone
  When I ask for the current date
  Then I should get the current date

@wanker
Scenario: I can get a specific date
  Given I am within the GMT timezone
  When I ask for the date:
  | date                     |
  | 2020-02-18T12:34:56.999Z |
  Then I should get the expected date

Scenario Outline: I can get an example date
  Given I am within the GMT timezone
  When I ask for a <date>
  Then I should get <expectedDate>

  Examples:
  | date                     | expectedDate             |
  | 2020-02-18               | 2020-02-18T00:00:00.000Z |
