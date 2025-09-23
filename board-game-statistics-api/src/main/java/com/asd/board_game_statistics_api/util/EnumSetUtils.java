package com.asd.board_game_statistics_api.util;

import java.util.EnumSet;

public class EnumSetUtils {

    public static <E extends Enum<E>> EnumSet<E> fromBitmask(Class<E> enumClass, long mask) {
        EnumSet<E> set = EnumSet.noneOf(enumClass);
        for (E e : enumClass.getEnumConstants()) {
            if ((mask & bitValueOf(e)) != 0) {
                set.add(e);
            }
        }
        return set;
    }

    public static <E extends Enum<E>> long toBitmask(EnumSet<E> set) {
        long mask = 0;
        for (E e : set) {
            mask |= bitValueOf(e);
        }
        return mask;
    }

    private static <E extends Enum<E>> long bitValueOf(Enum<E> e) {
        return 1L << e.ordinal();
    }
}
