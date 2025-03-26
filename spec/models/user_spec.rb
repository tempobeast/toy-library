require 'rails_helper'

RSpec.describe User, type: :model do
  context 'when creating a new user account' do
    it 'raises an error when password less than 8 characters' do
      expect {User.create!(username: "BobDog", password: "Abcdefg", email: "bob@bob.bob", first_name: "Bob", last_name: "Bob")}.to raise_error(ActiveRecord::RecordInvalid)
    end

  
    it 'does not throw an error when the password is 8 or more characters' do
      expect {User.create!(username: "BobDog", password: "Abcdefghijk", email: "bob@bob.bob", first_name: "Bob", last_name: "Bob")}.not_to raise_error
    end


  
    it 'raises an error when the email is not in valid format' do
      expect {User.create!(username: "BobDog3", password: "Abcdefghijk", email: "bobdogb", first_name: "Bob", last_name: "Bob")}.to raise_error(ActiveRecord::RecordInvalid)
    end
  

  
    it 'raises an error when the username is already in use' do
     User.create!(username: "BobDog3", password: "Abcdefghijk", email: "bobdog@bob.dog", first_name: "Bob", last_name: "Bob")
      expect {User.create!(username: "BobDog3", password: "Abcdefghijk", email: "bobdog@bob.doc", first_name: "Bob", last_name: "Bob")}.to raise_error(ActiveRecord::RecordInvalid)
    end



    it 'users are added with the correct information' do
      username = 'testusername'
      password = 'Abcdefghi'
      email = 'test@email.test'
      first_name = 'test'
      last_name = 'user'
      telephone = '1234567890'

      expected_username = username
      expected_email = email
      expected_first_name = first_name
      expected_last_name = last_name
      expected_telephone = telephone

      user = User.create!(username: username, password: password, email: email, first_name: first_name, last_name: last_name, telephone: telephone)
      expected_user = User.find_by(username: expected_username, email: expected_email, first_name: expected_first_name, last_name: expected_last_name, telephone: expected_telephone)
      expect(user).to eq(expected_user)
    end



    it 'users are added without admin credentials' do
      username = 'testusername'
      password = 'Abcdefghi'
      email = 'test@email.test'
      first_name = 'test'
      last_name = 'user'
      telephone = '1234567890'

      expected_username = username
      expected_email = email
      expected_first_name = first_name
      expected_last_name = last_name
      expected_telephone = telephone

      user1 = User.create!(username: 'first_user', password: password, email: 'email@email.email', first_name: first_name, last_name: last_name, telephone: telephone)
      user2 = User.create!(username: username, password: password, email: email, first_name: first_name, last_name: last_name, telephone: telephone)
      expected_user = User.find_by(username: expected_username, email: expected_email, first_name: expected_first_name, last_name: expected_last_name, telephone: expected_telephone)
      expect(expected_user.is_admin?).to eq(false)
    end
  end
end
