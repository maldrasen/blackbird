describe("BaseEquipment", function() {

  // These specs run against the real shipped equipment rather than throwaway fixtures - there is no way to unregister
  // a record, so registering test pieces would leave them polluting the armory. The expected values are hard-coded so
  // that any change to a piece's data trips the spec.

  it("throws on an unknown code", function() {
    expect(() => BaseEquipment.lookup('spork')).to.throw(/spork/);
  });

  describe("kind", function() {
    it("a weapon is anything with a damage range", function() {
      expect(BaseEquipment.lookup('longsword').isWeapon()).to.be.true;
      expect(BaseEquipment.lookup('plate').isWeapon()).to.be.false;
      expect(BaseEquipment.lookup('buckler').isWeapon()).to.be.false;
    });

    it("a shield is the only thing typed shield", function() {
      expect(BaseEquipment.lookup('buckler').isShield()).to.be.true;
      expect(BaseEquipment.lookup('longsword').isShield()).to.be.false;
      expect(BaseEquipment.lookup('plate').isShield()).to.be.false;
    });

    it("is only lewd when the record says so", function() {
      expect(BaseEquipment.lookup('leggings').isLewd()).to.be.false;
      expect(BaseEquipment.lookup('chaps').isLewd()).to.be.true;
    });

    it("armor and shields carry a reduction profile", function() {
      expect(BaseEquipment.lookup('plate').hasReduction()).to.be.true;
      expect(BaseEquipment.lookup('buckler').hasReduction()).to.be.true;
      expect(BaseEquipment.lookup('longsword').hasReduction()).to.be.false;
    });
  });

  describe("getSlots()", function() {
    it("puts a main hand weapon in the primary slot", function() {
      expect(BaseEquipment.lookup('longsword').getSlots()).to.deep.equal([EquipmentSlot.primary]);
    });

    it("puts a two handed weapon in the primary slot", function() {
      expect(BaseEquipment.lookup('claymore').getSlots()).to.deep.equal([EquipmentSlot.primary]);
    });

    it("lets a one handed weapon go in either hand", function() {
      expect(BaseEquipment.lookup('knife').getSlots()).to.deep.equal([EquipmentSlot.primary, EquipmentSlot.secondary]);
    });

    it("reads the slot armor names", function() {
      expect(BaseEquipment.lookup('plate').getSlots()).to.deep.equal([EquipmentSlot.chest]);
      expect(BaseEquipment.lookup('boots').getSlots()).to.deep.equal([EquipmentSlot.feet]);
    });

    it("puts a shield in the secondary slot because it is held in the off hand", function() {
      const buckler = BaseEquipment.lookup('buckler');
      expect(buckler.getHands()).to.equal(WeaponHandedness.off);
      expect(buckler.getSlot()).to.be.undefined;
      expect(buckler.getSlots()).to.deep.equal([EquipmentSlot.secondary]);
    });
  });

  describe("getSkill()", function() {
    it("names the skill after the weapon type", function() {
      expect(BaseEquipment.lookup('longsword').getSkill()).to.equal('swords');
      expect(BaseEquipment.lookup('shortbow').getSkill()).to.equal('bows');
    });

    it("blocks with a shield", function() {
      expect(BaseEquipment.lookup('buckler').getSkill()).to.equal('block');
    });
  });

  describe("getName()", function() {
    it("prefixes the name with the material it was made from", function() {
      expect(BaseEquipment.lookup('longsword').getName({ steel:3 })).to.equal('Steel Longsword');
      expect(BaseEquipment.lookup('doublet').getName({ silk:4 })).to.equal('Silk Doublet');
    });

    it("lets a record name itself from the materials picked", function() {
      expect(BaseEquipment.lookup('mace').getName({ bone:2 })).to.equal('Skullhead Mace');
      expect(BaseEquipment.lookup('wood-buckler').getName({ wood:1 })).to.equal('Wooden Buckler');
    });

    it("ignores the materials when the name is fixed", function() {
      expect(BaseEquipment.lookup('bullwhip').getName({ leather:2 })).to.equal('Bullwhip');
    });
  });

  describe("weapon properties", function() {
    it("reads the authored damage range", function() {
      const longsword = BaseEquipment.lookup('longsword');
      expect(longsword.getLow()).to.equal(50);
      expect(longsword.getHigh()).to.equal(100);
    });

    it("expands a single damage type to the full percent", function() {
      expect(BaseEquipment.lookup('longsword').getDamageTypes()).to.deep.equal([
        { type:DamageType.slash, percent:100 },
      ]);
    });

    it("keeps a split damage type as authored", function() {
      expect(BaseEquipment.lookup('knife').getDamageTypes()).to.deep.equal([
        { type:DamageType.slash, percent:60 },
        { type:DamageType.pierce, percent:40 },
      ]);
    });

    it("defaults the reach to close", function() {
      expect(BaseEquipment.lookup('hatchet').getReach()).to.equal(WeaponReach.close);
      expect(BaseEquipment.lookup('spear').getReach()).to.equal(WeaponReach.extended);
    });
  });

  describe("getReduction()", function() {
    it("reads the authored profile for one damage type", function() {
      const plate = BaseEquipment.lookup('plate');
      expect(plate.getReduction(DamageType.crush)).to.equal(40);
      expect(plate.getReduction(DamageType.slash)).to.equal(50);
      expect(plate.getReduction(DamageType.pierce)).to.equal(48);
    });

    it("maps all three physical damage types", function() {
      expect(BaseEquipment.lookup('plate').getReductionMap()).to.deep.equal({ crush:40, slash:50, pierce:48 });
    });

    it("is zero for equipment without a profile", function() {
      expect(BaseEquipment.lookup('longsword').getReductionMap()).to.deep.equal({ crush:0, slash:0, pierce:0 });
    });
  });

});
