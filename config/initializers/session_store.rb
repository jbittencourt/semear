# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_semear_session',
  :secret      => '991afe167deef990c2e6505a4f6fb82bab179d6e0af928c550558d2159f71be2394c6e78b4c2fcd9e989f828ce6b0d394fa4e193aee1b7d2a123eb56b8bd2ba6'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
