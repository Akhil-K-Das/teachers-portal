require 'rails_helper'

RSpec.feature 'Student Management', type: :feature do
  scenario 'Teacher adds a new student' do
    visit new_student_path
    
    fill_in 'Name', with: 'Jane Smith'
    fill_in 'Subject', with: 'Science'
    fill_in 'Mark', with: 90
    
    click_button 'Add Student'
    
    expect(page).to have_content('Student successfully created.')
    expect(page).to have_content('Jane Smith')
  end
end
