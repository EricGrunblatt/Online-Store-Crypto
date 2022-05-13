import nltk
nltk.download();
from nltk.corpus import wordnet
 
syn1 = wordnet.synsets('clothes')[0]
syn2 = wordnet.synsets('jeans')[0]
 
print ("hello name :  ", syn1.name())
print ("selling name :  ", syn2.name())
score=syn1.wup_similarity(syn2)
print(score);