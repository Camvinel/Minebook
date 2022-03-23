from math import pow

MAX_ELO_LOSS = 400

class User:
    def __init__(self, baseElo):
        self.actualElo = baseElo
        self.numberOfGames = 0
    
    def calcK(self):
        if(self.numberOfGames < 30):
            return 40
        elif(self.actualElo < 2400):
            return 20
        else:
            return 10

    def updateElo(self, W, p):
        K = self.calcK()
        self.actualElo = round(self.actualElo + K*(W-p))
        print("Le nouvel elo est maintenant : " + str(self.actualElo))

class MatchHandler:
    def __init__(self, user1, user2):
        self.user1 = user1
        self.user2 = user2

    def matchPlayers(self, W):
        p = self.calcProbability()
        print("La probabilite est : " + str(p))
        self.user1.updateElo(W, p)
        self.user2.updateElo(1-W, 1-p)
    
    def calcEloDifference(self):
        return self.user1.actualElo - self.user2.actualElo

    def calcProbability(self):
        D = self.calcEloDifference()
        return 1/(1+pow(10, -D/MAX_ELO_LOSS))

user1 = User(1800)
user2 = User(2005)
match1 = MatchHandler(user1, user2)
match1.matchPlayers(0.5)