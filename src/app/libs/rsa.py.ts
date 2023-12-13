const calc_gcd = `
def gcd(a, b):
   if b == 0:
      return a
   return gcd(b, a % b)
`

const calc_lcm =
  calc_gcd +
  `
def lcm(a, b):
   return (a * b) / gcd(a, b)
`

export const calc_n = `
def calcN(p, q):
  n = p * q
  return n
`

export const calc_l =
  calc_lcm +
  `

def calcL(p, q):
   l = lcm(p - 1, q - 1)
   return l
`

export const calc_proposal_e =
  calc_gcd +
  `
def proposalE(l):
   tmp_es = []
   for e in range(2, l):
      if gcd(e, l) == 1:
         tmp_es.append(e)
   return tmp_es
`

export const calc_proposal_d = `
def proposalD(e, l):
  tmp_ds = []
  for d in range(2, l):
    if ((e * d) % l == 1):
      tmp_ds.append(d)  
  return tmp_ds
`
export const calc_encript = `
def encrypt(send, e, n):
  mod_send = send % n
  enc = 1
  for i in range(e):
    enc = (enc * mod_send) % n
  return enc
`

export const calc_decript = `
def decrypt(encry, d, n):
  mod_encry = encry % n
  dec = 1
  for i in range(d):
    dec = (dec * mod_encry) % n
  return dec
`
