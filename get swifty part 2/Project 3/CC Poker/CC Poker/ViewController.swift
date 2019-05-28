//
//  ViewController.swift
//  CC Poker
//
//  Created by Ale Mohamad on 23/05/2019.
//  Copyright © 2019 Ale Mohamad. All rights reserved.
//

/**
 * Project #3: Card-Counter
 * Get Swifty - Part 2
 * Pirple
 *
 * For this assignment, you are to build a "card counter" app to help gamblers
 * win at blackjack. Your app should allow the gambler to enter what cards are
 * being dealt, as they happen, and should guide them as to how to bet and play,
 * accordingly. Specifically they should be able to:
 *
 * 1. Mark that a new deck is being opened/used by the dealer
 * 2. Enter which cards have been drawn, hand by hand (and which player has
 *    received them)
 * 3. Receive guidance from the app on whether to "hit" or "stay" at any
 *    given moment.
 * 4. Receive guidance from the app regarding how large of a bet they should
 *    be placing at any given time (use the system explained in the youtube
 *    video above to guide your development).
 *
 * Extra Credit:
 * If a gambler gets caught using an app like this, they'll probably get
 * kicked out of the casino. Disguise your app so that nobody can tell what
 * the player is doing. Choose any disguise you wish. It could look like a
 * Tetris game, or a messaging app for example, as long as the user can still
 * covertly use it to win at blackjack. If you choose this disguised route,
 * provide instructions on how the user can use it.
 **/

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet var runningCountLabel: UILabel!
    @IBOutlet var betAmountLabel: UILabel!
    @IBOutlet var hitStayLabel: UILabel!
    
    @IBOutlet var cardsHighButton: RoundButton!
    @IBOutlet var cardsNeutralButton: RoundButton!
    @IBOutlet var cardsLowButton: RoundButton!
    @IBOutlet var newDeckButton: RoundButton!
    
    var incognitoMode = false
    var runningCount = 0
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        updateResults()
    }
    
    @IBAction func dealHighTapped(_ sender: Any) {
        runningCount += 1
        updateResults()
    }
    
    @IBAction func dealNeutralTapped(_ sender: Any) {
        runningCount += 0
        updateResults()
    }
    
    @IBAction func dealLowTapped(_ sender: Any) {
        runningCount -= 1
        updateResults()
    }
    
    @IBAction func newDeckTapped(_ sender: Any) {
        runningCount = 0
        updateResults()
    }
    
    @IBAction func swipeDownHide(_ sender: Any) {
        activateIncognitoMode()
    }
    
    @IBAction func swipeUpShow(_ sender: Any) {
        activateNormalDesign()
    }
    
    @IBAction func howToTapped(_ sender: Any) {
        showInfo()
    }
    
    func updateResults() {
        runningCountLabel.text = runningCount >= 0 ? "+\(runningCount)" : "\(runningCount)"
        
        if incognitoMode {
            self.hitStayLabel.text = runningCount >= 0 ? "⨯" : "०"
        } else {
            self.hitStayLabel.text = runningCount >= 0 ? "HIT" : "STAY"
        }
        
        betAmountLabel.text = runningCount > 3 ? "↑" : "↓"
    }
    
    func activateIncognitoMode() {
        incognitoMode = true
        updateResults()
        navigationController?.setNavigationBarHidden(true, animated: true)
        
        UIView.animate(withDuration: 0.2) { [unowned self] in
            self.view.backgroundColor = .black
            
            let darkColor = UIColor(red: 20/255, green: 20/255, blue: 20/255, alpha: 1)
            self.cardsHighButton.bgColor = darkColor
            self.cardsNeutralButton.bgColor = darkColor
            self.cardsLowButton.bgColor = darkColor
            self.newDeckButton.bgColor = darkColor
            
            self.cardsHighButton.color = darkColor
            self.cardsNeutralButton.color = darkColor
            self.cardsLowButton.color = darkColor
            self.newDeckButton.color = darkColor
            
            self.runningCountLabel.textColor = darkColor
            self.betAmountLabel.textColor = darkColor
            self.hitStayLabel.textColor = darkColor
        }
    }
    
    func activateNormalDesign() {
        incognitoMode = false
        updateResults()
        navigationController?.setNavigationBarHidden(false, animated: true)
        
        UIView.animate(withDuration: 0.2) { [unowned self] in
            self.view.backgroundColor = .white
            
            self.cardsHighButton.bgColor = UIColor(red: 79/255, green: 143/255, blue: 0/255, alpha: 1)
            self.cardsNeutralButton.bgColor = .lightGray
            self.cardsLowButton.bgColor = UIColor(red: 255/255, green: 38/255, blue: 0/255, alpha: 1)
            self.newDeckButton.bgColor = UIColor(red: 94/255, green: 94/255, blue: 94/255, alpha: 1)
            
            self.cardsHighButton.color = .white
            self.cardsNeutralButton.color = .white
            self.cardsLowButton.color = .white
            self.newDeckButton.color = .white
            
            self.runningCountLabel.textColor = .black
            self.betAmountLabel.textColor = .black
            self.hitStayLabel.textColor = .black
        }
    }
    
    func showInfo() {
        let info = """
        With Hi-Lo, the most common card counting system, the card values are as follows:\n
        2, 3, 4, 5, 6 = +1
        7, 8, 9 = 0
        10, J, Q, K, Ace = -1\n
        As each card is dealt, you will either add 1, subtract 1, or do nothing based on each card’s value.\n
        A card counter does this for each card that comes out of the shoe: card after card and round after round until the dealer shuffles the cards again.\n
        HINT: If you need to hide this app, you should swipe down to hide the UI. Then swipe up to show it again.
        """
        
        let alertController = UIAlertController(title: "Card-Counter Poker", message: info, preferredStyle: .alert)
        let OKAction = UIAlertAction(title: "Got it!", style: .default, handler: nil)
        alertController.addAction(OKAction)
        alertController.view.tintColor = .black
        present(alertController, animated: true, completion: nil)
    }
    
}

