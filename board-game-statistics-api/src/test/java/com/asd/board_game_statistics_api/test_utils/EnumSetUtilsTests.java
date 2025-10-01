package com.asd.board_game_statistics_api.test_utils;

import com.asd.board_game_statistics_api.util.EnumSetUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.EnumSet;

@SpringBootTest
public class EnumSetUtilsTests {

    private enum TestEnum {
        VALUE_1,
        VALUE_2,
        VALUE_3,
        VALUE_4,
        VALUE_5
    }

    @Test
    void testFromBitmask() {
        int bitMask = 1 + 4 + 16;
        EnumSet<TestEnum> expectedEnumSet = EnumSet.of(TestEnum.VALUE_1, TestEnum.VALUE_3, TestEnum.VALUE_5);

        Assertions.assertEquals(expectedEnumSet, EnumSetUtils.fromBitmask(TestEnum.class, bitMask));
    }

    @Test
    void testToBitmask() {
        EnumSet<TestEnum> enumSet = EnumSet.of(TestEnum.VALUE_2, TestEnum.VALUE_4);
        int expectedBitMask = 2 + 8;

        Assertions.assertEquals(expectedBitMask, EnumSetUtils.toBitmask(enumSet));
    }

}
