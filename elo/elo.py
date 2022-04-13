from math import pow

MAX_ELO_LOSS = 400

class User:
    def __init__(self, baseElo):
        self.actualElo = baseElo
        self.numberOfGames = 0
    
    
    def calcK(self):
        """Computes K, development coefficient of the user, equal to :
            - 40 if user has less than 30 games played
            - 20 if user has less than 2400 elo
            - 10 elsewise
        """

        if(self.numberOfGames < 30):
            return 40
        elif(self.actualElo < 2400):
            return 20
        else:
            return 10

    def updateElo(self, W, p):
        """Updates the elo of the user.

        Parameters
        ----------
        W : str
            Indicator in {0, 0.5, 1}
            - 0 if user loses
            - 0.5 for a draw
            - 1 if user wins

        p : float
            Probability for the user to win between 0 and 1
        """

        K = self.calcK()
        self.actualElo = round(self.actualElo + K*(W-p))
        print("Le nouvel elo est maintenant : " + str(self.actualElo))

class MatchHandler:
    def __init__(self, user1, user2):
        """Initialize a match between user1 and user2.

        Parameters
        ----------
        user1 : User

        user2 : User
        """

        self.user1 = user1
        self.user2 = user2

    def matchUsers(self, W):
        """Initiate a match between user1 and user2.

        Parameters
        ----------
        W : str
            Indicator in {0, 0.5, 1}
            - 0 if user1 loses
            - 0.5 for a draw
            - 1 if user1 wins
        """

        p = self.calcProbability()
        print("La probabilité est : " + str(p))
        self.user1.updateElo(W, p)
        self.user2.updateElo(1-W, 1-p)
    
    def calcEloDifference(self):
        """Computes the elo difference between user1 and user2. It is positive if
        user1's elo is superior to user2's elo.
        The difference has a 400 points threshold.
        """
        if(abs(self.user1.actualElo - self.user2.actualElo) > 400):
            if(self.user1.actualElo - self.user2.actualElo < 0):
                return -400
            else:
                return 400
        else:
            return self.user1.actualElo - self.user2.actualElo

    def calcProbability(self):
        """Computes the probability for user1 to win the match.
        """

        D = self.calcEloDifference()
        return 1/(1+pow(10, -D/MAX_ELO_LOSS))

user1 = User(1800)
user2 = User(2005)
match1 = MatchHandler(user1, user2)
match1.matchUsers(0.5)