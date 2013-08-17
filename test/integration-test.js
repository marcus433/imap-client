'use strict';

var ImapClient, loginOptions, expect, uid;

if (typeof window === 'undefined') {
    ImapClient = require('../index').ImapClient;
    expect = require('chai').expect;
} else {
    ImapClient = window.ImapClient;
    expect = window.chai.expect;
}

loginOptions = {
    port: 993,
    // host: 'secureimap.t-online.de',
    // auth: {
    //     user: "whiteout.test@t-online.de",
    //     pass: "@6IyFg1SIlWH91Co"
    // },
    host: 'imap.gmail.com',
    auth: {
        user: "safewithme.testuser@gmail.com",
        pass: "hellosafe"
    },
    secure: true
};

describe('ImapClient integration tests', function() {
    this.timeout(20000);

    var ic;

    beforeEach(function(done) {
        ic = new ImapClient(loginOptions);
        ic.login(done);
    });


    afterEach(function(done) {
        ic.logout(done);
    });

    describe('ImapClient.listFolders', function() {
        it('should list folders', function(done) {
            ic.listFolders(function(error, mailboxes) {
                expect(error).to.not.exist;
                expect(mailboxes).to.exist;
                done();
            });
        });
    });

    describe('ImapClient.listMessages', function() {
        it('should list messages', function(done) {
            ic.listMessages({
                path: 'INBOX',
                offset: 0,
                length: 10
            }, function(error, messages) {
                expect(error).to.not.exist;
                expect(messages).to.exist;
                uid = messages[0].uid;
                done();
            });
        });
    });

    describe('ImapClient.getMessage', function() {
        it('should get a specific message', function(done) {
            ic.getMessage({
                path: 'INBOX',
                uid: uid
            }, function(message) {
                expect(message).to.exist;
                done();
            });
        });
    });
});