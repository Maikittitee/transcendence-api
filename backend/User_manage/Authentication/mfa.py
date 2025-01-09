import pyotp

class MFA:
	def __init__(self, mfa_secret: str):
		self.mfa_secret = mfa_secret


	def verify(self, otp):
		totp = pyotp.TOTP(self.mfa_secret)
		if (totp.verify(otp)):
			return (True)
		return (False)